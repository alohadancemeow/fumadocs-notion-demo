"use server";

import { notion } from "@/lib/notion/notion-client";
import { api } from "@/lib/notion/notion-api";
// import { revalidatePath } from "next/cache";
// import { postMapping } from "@/helpers/post-mapping";

type NotionQueryParams = {
  filter: any;
  sorts: any[];
};

// Function to query the Notion database
const queryNotionDatabase = async (queryParams: NotionQueryParams) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
      ...queryParams,
    });

    return response.results;
  } catch (error) {
    console.error("Failed to query Notion database:", error);
    throw new Error("Failed to query Notion database");
  }
};

/**
 * Get all published posts in Notion
 * @returnsType PageData[]
 */

const PAGE_STATUS = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;

export const getAllPosts = async () => {
  const queryParams: NotionQueryParams = {
    filter: {
      property: "Status",
      status: {
        // equals: "Done",
        // "Not Started" | "In Progress" | "Completed"
        equals: PAGE_STATUS.COMPLETED,
      },
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  };

  const results = await queryNotionDatabase(queryParams);
  if (!results.length) return [];

  //   const pageData = postMapping(results);
  // revalidatePath("/posts", "page");

  //   return pageData;
  return results;
};

// Retrieve a specific page from Notion
export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

type PageContentFetcher = (slug: string) => Promise<any>;

// Using notion API to fetch content by page ID
const fetchPageContent: PageContentFetcher = async (pageId: string) => {
  if (!pageId) return null;

  try {
    const recordMap = await api.getPage(pageId);
    return recordMap;
  } catch (error) {
    console.error("Failed to fetch page content:", error);
    throw new Error("Failed to fetch page content");
  }
};

export const getPageContent = async (slug: string) => fetchPageContent(slug);

// Helper function to fetch content by page ID from environment variables
// const fetchContentById = async (pageId: string, pathToRevalidate: string) => {
//   if (!pageId) throw new Error("Page ID is required");
//   // console.log("fetchContentById", pageId);

//   // revalidatePath(pathToRevalidate, "page");
//   return fetchPageContent(pageId);
// };
