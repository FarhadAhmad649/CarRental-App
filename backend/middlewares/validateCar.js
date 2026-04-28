export const validateCar = (req, res, next) => {
    const { brand, model, price, year, category, seating_capacity, fuel_type, transmission, location, description, isAvailable } = req.body;

    if (
      !brand && !model && !price && !year && !category &&
      !seating_capacity && !fuel_type && !transmission &&!location && !description && !isAvailable
    ) {
      return res.status(400).json({
        message: "You missed credentials, Please fill all the creadentials",
      });
    }

    if(typeof price !== "number"){
        return res.status(400).json({
            message:"pricePerDay must be a number"
        })
    }
    if(typeof year !== "number"){
        return res.status(400).json({
            message:"Year must be a number"
        })
    }
    if(typeof seating_capacity !== "number"){
        return res.status(400).json({
            message:"pricePerDay must be a number"
        })
    }

    next()

    
}