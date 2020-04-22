/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
export const makeOne = (model) => async (req, res) => {
  const { body } = req
  // const createdBy = req.user._id
  if (!body) {
    res.status(400).end()
  }
  try {
    const data = await model.create({
      ...body,
      // createdBy,
    })
    res.status(201).json({ data })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

export const getMany = (model) => async (req, res) => {
  try {
    const data = await model.find({}).lean().exec()
    res.status(200).json({
      data,
    })
  } catch (err) {
    console.error(err)
  }
}

export const getOne = (model) => async (req, res) => {
  try {
    const data = await model.findOne({ _id: req.params.id }).lean().exec()
    if (!data) res.status(404).end('Not found')
    res.status(200).json({
      data,
    })
  } catch (err) {
    console.error(err)
    res.status(400).end('Not found')
  }
}
export const updateOne = (model) => async (req, res) => {
  const { body } = req
  // const createdBy = req.user._id
  if (!body) {
    res.status(400).end()
  }
  try {
    const data = await model
      .findOneAndUpdate({ _id: req.params.id }, { ...body }, { new: true })
      .lean()
      .exec()

    res.status(200).json({ data })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

const deleteOne = (model) => async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const deletedData = await model.deleteOne({ _id: req.params.id })
    res.status(200).send({ message: 'Deleted' })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

export const crudControllers = (model) => ({
  makeOne: makeOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
})
