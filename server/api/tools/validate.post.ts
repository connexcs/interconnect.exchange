import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { rateCard } = body

  if (!rateCard) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Rate card data is required'
    })
  }

  try {
    // Parse the rate card JSON
    const parsed = JSON.parse(rateCard)
    
    // Load the schema for validation (optional, for future use)
    // const schemaPath = join(process.cwd(), 'docs-content', 'schema', 'open-rate-card.schema.json')
    // const schemaContent = await readFile(schemaPath, 'utf-8')
    // const schema = JSON.parse(schemaContent)

    // Basic validation checks
    const errors: string[] = []
    
    if (!parsed.name) errors.push('Missing required field: name')
    if (!parsed.schema_version) errors.push('Missing required field: schema_version')
    if (!parsed.version) errors.push('Missing required field: version')
    if (!parsed.date) errors.push('Missing required field: date')
    if (!parsed.cards) errors.push('Missing required field: cards')

    const isValid = errors.length === 0

    return {
      valid: isValid,
      errors: errors.length > 0 ? errors : undefined,
      message: isValid ? 'Rate card is valid!' : 'Validation failed'
    }
  } catch (error) {
    return {
      valid: false,
      errors: [(error as Error).message],
      message: 'Invalid JSON format'
    }
  }
})
