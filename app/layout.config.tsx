import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { NotebookPen } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: `https://github.com/alohadancemeow/fumadocs-notion-demo`,
  nav: {
    title: (
      <>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Logo"
        >
          <circle cx={12} cy={12} r={12} fill="currentColor" />
        </svg>
        My Blog
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [
    {
      icon: <NotebookPen />,
      text: "Blog",
      url: "/blog",
      // secondary items will be displayed differently on navbar
      secondary: false,
    },
  ],
};
