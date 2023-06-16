import { models } from "@/database/models";
const {FeaturedDrugs} = models;




//Controller for get method

export async function getDrug(req, res) {
    try {
      const drug = await FeaturedDrugs.findAll();
      if (drug) {
        console.log(drug, "serverside");
        return await res.status(200).send(drug);
      }
      return res.status(500).send({ error: "Oops! something wrong" });
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }
  // contoller for single get method
  

  export async function getDrug_category(req, res) {
    try {
      const {id} = req.query;
      console.log(req, "category Id");
      const drugs = await FeaturedDrugs.findAll({where:{ category: id}});
      if(drugs.length > 0) {
        return await res.status(200).send(drugs);
      }
      return res.status(404).json({message: "No drugs found for this category"})
    } catch (error) {
      res.status(500).send({ error: "Oops! something wrong" });
    }
  }

  export async function getOneDrug(req, res) {
    const {featuredDrugId} = req.query;
    try {
      if (featuredDrugId) {
        const drug = await FeaturedDrugs.findOne({ where: { id: featuredDrugId } });
        if (drug) return res.status(200).send(drug);
      }
      // res.status(404).json({ error: "drug not selected" });
    } catch (error) {
      res.status(404).json({ error: "Cannot get the drug" });
    }
  }
  
  //controller to post
  export async function postDrug(req, res) {
    try {
      
      const result = await FeaturedDrugs.create(req.body);
      console.log(req.body, "req body")
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
  
  export async function putDrug(req, res) {
    try {
      const { models, drugId } = req.body;
      if (drugId) {
        const drug = await FeaturedDrugs.findOne({
          where: { id: drugId },
        });
        if (drug) {
          drug.set(models);
          await drug.save();
          return res
            .status(200)
            .send({ message: "Updated successfully", isUpdated: true });
        }
      }
      res
        .status(500)
        .json({ message: "drug not Selected...!", isUpdated: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while updating the data", isUpdated: false });
    }
  }
  
  //Controller for delete method
  
  export async function deleteDrug(req, res) {
    try {
      const {drugId}  = req.query;
      console.log(drugId, 'from query param')
      if (parseInt(drugId)) {
        const drug = await FeaturedDrugs.findOne({
          where: { id: drugId },
        });
        if (drug) {
          await drug.destroy();
          return await res
          .status(200)
          .send({ message: "Deleted successfully", isDeleted: true });
        }
       
      }
      console.log(drugId, "error");
      return res
        .status(404)
        .json({ message: "drug not selected", isDeleted: false });
    } catch (error) {
      res.status(404).json({ error: "Error while deleting the drug" });
    }
  }