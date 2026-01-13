import { marked } from 'marked'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const useMarkdown = () => {
  const renderMarkdown = (content: string): string => {
    return marked(content)
  }

  const loadMarkdownFile = async (filename: string): Promise<string> => {
    try {
      const filePath = join(process.cwd(), 'docs-content', filename)
      const content = await readFile(filePath, 'utf-8')
      return content
    } catch (error) {
      console.error('Error loading markdown file:', error)
      return ''
    }
  }

  return {
    renderMarkdown,
    loadMarkdownFile
  }
}
