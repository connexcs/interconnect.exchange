# interconnect.exchange

Website for the [Open Rate Card Specification](https://github.com/connexcs/interconnect-made-easy) - Interconnect Made Easy

## Features

- **📚 Documentation**: Complete specification rendered from the interconnect-made-easy repository
- **🛠️ Tools**: Interactive tools for working with rate cards
  - **Validator**: Validate rate card JSON against the specification
  - **Checksum**: Add SHA-256 checksums to rate cards
  - **Builder**: Build rate cards using a form interface
  - **Examples**: View and load example rate cards
- **🎨 Modern Design**: Built with Nuxt 3, Vue 3, and Tailwind CSS
- **☁️ Cloudflare Ready**: Optimized for deployment on Cloudflare Pages

## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **UI Framework**: [Vue 3](https://vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Markdown**: [Marked](https://marked.js.org/)
- **Deployment**: Cloudflare Pages

## Project Structure

```
interconnect.exchange/
├── pages/              # Application pages
│   ├── index.vue       # Home page
│   ├── tools.vue       # Tools page
│   └── docs/           # Documentation pages
├── components/         # Vue components
│   ├── Header.vue      # Site header
│   └── Footer.vue      # Site footer
├── server/            # Server-side API
│   └── api/
│       ├── docs/       # Documentation API
│       └── tools/      # Tools API
├── docs-content/      # Git submodule (interconnect-made-easy)
└── assets/            # Static assets
```

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository with submodules:
```bash
git clone --recurse-submodules https://github.com/connexcs/interconnect.exchange.git
cd interconnect.exchange
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Generate Static Site

```bash
npm run generate
```

## Deployment

This project is configured for Cloudflare Pages deployment. The build command is:

```bash
npm run build
```

The output directory is `dist/`.

## Documentation

The documentation is automatically rendered from the [interconnect-made-easy](https://github.com/connexcs/interconnect-made-easy) repository, which is included as a git submodule in `docs-content/`.

To update the documentation:

```bash
git submodule update --remote docs-content
```

## Tools

### Validator
Validates rate card JSON documents against the Open Rate Card specification, checking for required fields and proper structure.

### Checksum
Generates SHA-256 checksums for rate cards using canonical JSON (RFC 8785) for integrity verification.

### Builder
Interactive form-based builder for creating rate card JSON documents with all required fields.

### Examples
Pre-filled examples demonstrating valid rate card structures that can be loaded into other tools.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is part of the Open Rate Card Specification initiative by ConnexCS.

## Links

- [GitHub Repository](https://github.com/connexcs/interconnect.exchange)
- [Open Rate Card Spec](https://github.com/connexcs/interconnect-made-easy)
- [ConnexCS](https://connexcs.com)

