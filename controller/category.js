import { models } from "@/database/models";

const { Categories } = models;

//Controller for get method

export async function getCategory(req, res) {
  try {
    const category = await Categories.findAll();
    if (category) {
      console.log(category, "serverside");
      return await res.status(200).send(category);
    }
    return res.status(500).send({ error: "Oops! something wrong" });
  } catch (error) {
    res.status(500).send({ error: "Oops! something wrong" });
  }
}
// contoller for single get method

export async function getOneCategory(req, res, categoryId) {
  // const {categoryId} = req.query;
  try {
    if (categoryId) {
      const category = await Categories.findAll({ where: { id: categoryId } });
      if (category) return res.status(200).send(category);
    }
    res.status(404).json({ error: "Category not selected" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the category" });
  }
}

//controller to post
export async function postCategory(req, res) {
  try {
    // const { formData } = req.body;
    // console.log(req.body, "form data");
    const result = await Categories.create(req.body);
    if (result)
      return res
        .status(200)
        .send({ message: "Saved successfully", isSaved: true });
    if (!result)
      return res
        .status(500)
        .send({ message: "ooppss something went wrong!", isSaved: false });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

//COntroller to put data

export async function putCategory(req, res) {
  try {
    const { models, categoryId } = req.body;
    if (categoryId) {
      const category = await Categories.findOne({
        where: { id: categoryId },
      });
      if (category) {
        category.set(models);
        await category.save();
        return res
          .status(200)
          .send({ message: "Updated successfully", isUpdated: true });
      }
    }
    res
      .status(500)
      .json({ message: "category not Selected...!", isUpdated: false });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating the data", isUpdated: false });
  }
}

//Controller for delete method

export async function deleteCategory(req, res) {
  try {
    const {categoryId}  = req.query;
    console.log(categoryId, 'from query param')
    if (parseInt(categoryId)) {
      const category = await Categories.findOne({
        where: { id: categoryId },
      });
      if (category) {
        await category.destroy();
        return await res
        .status(200)
        .send({ message: "Deleted successfully", isDeleted: true });
      }
     
    }
    console.log(categoryId, "error");
    return res
      .status(404)
      .json({ message: "category not selected", isDeleted: false });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the category" });
  }
}
