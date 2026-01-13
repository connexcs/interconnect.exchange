import crypto from 'crypto'

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
    const parsed = JSON.parse(rateCard)
    
    // Create canonical JSON string (sorted keys)
    const canonical = JSON.stringify(parsed, Object.keys(parsed).sort())
    
    // Calculate SHA-256 checksum
    const checksum = crypto.createHash('sha256').update(canonical).digest('hex')
    
    // Add checksum to the rate card
    parsed.checksum = checksum

    return {
      success: true,
      rateCard: JSON.stringify(parsed, null, 2),
      checksum,
      message: 'Checksum added successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid JSON format'
    })
  }
})
