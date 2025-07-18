
## Developing

Once you've created a project and installed dependencies with `deno install`, start a development server:

```bash
deno run dev

# or start the server and open the app in a new browser tab
deno run dev -- --open
```

## Building

To create a production version of your app:

```bash
deno run build
```

You can preview the production build with `deno run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
