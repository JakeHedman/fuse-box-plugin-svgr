# fuse-box-plugin-svgr

Svgr plugin for fuse-box 4 alpha

## Installation

```
npm install --save fuse-box-plugin-svgr
```

## Usage

```
  plugins: [pluginSvgr()],
```

## Options

See: https://react-svgr.com/docs/options/

```
  plugins: [pluginSvgr({
    replaceAttrValues: { "#61dafb": "{props.color}" }
  })],
```
