export const run = async (handler, res) => {
  try {
    await handler()
  } catch (e) {
    return res.status(400).json({
      message: e.message || "Something went wrong",
    })
  }
}
