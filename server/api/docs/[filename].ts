import { marked } from 'marked'
import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const filename = event.context.params?.filename

  if (!filename || !filename.endsWith('.md')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid filename'
    })
  }

  try {
    const filePath = join(process.cwd(), 'docs-content', filename)
    const content = await readFile(filePath, 'utf-8')
    const html = marked(content)
    return html
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Documentation file not found'
    })
  }
})
