import svgr from '@svgr/core'
import { generate } from 'fuse-box/compiler/generator/generator'
import { parseTypeScript } from 'fuse-box/compiler/parser'
import { transformCommonVisitors } from 'fuse-box/compiler/transformer'
import { Context, createContext } from 'fuse-box/core/context'
import { createModule } from 'fuse-box/moduleResolver/module'
import { createPackage } from 'fuse-box/moduleResolver/package'
import { parsePluginOptions } from 'fuse-box/plugins/pluginUtils'

function jsxToJs(src: string) {
  const ctx = createContext({
    envType: 1,
    publicConfig: {
      entry: 'svg.js',
      target: 'server',
    },
  })

  const pkg = createPackage({ meta: {} as any })
  const mod = createModule({
    absPath: 'svg.js',
    ctx,
    pkg,
  })

  mod.init()

  const con = mod.getTransformationContext()
  const ast = parseTypeScript(src, { jsx: true })
  transformCommonVisitors(con, ast)
  return generate(ast, { ecmaVersion: 7 })
}

export type SvgrPluginProps = any

export function pluginSvgr(
  a: string | RegExp | SvgrPluginProps,
  b?: SvgrPluginProps,
) {
  let [opts, matcher] = parsePluginOptions<SvgrPluginProps>(a, b, {})
  if (!matcher) matcher = /\.(svg)$/

  return (ctx: Context) => {
    ctx.ict.on('module_init', async (props) => {
      if (!matcher.test(props.module.absPath) || props.module.captured) return

      props.module.read()
      const svg = props.module.contents
      const jsx = svgr.sync(svg, opts)

      props.module.captured = true
      props.module.isExecutable = true
      props.module.isJavaScript = true
      props.module.contents = jsxToJs(jsx)

      return props
    })
  }
}
