export const validateCar = (req, res, next) => {

  let {
    brand,
    model,
    price,
    year,
    category,
    seating_capacity,
    fuel_type,
    transmission,
    location,
    description,
    isAvailable,
  } = req.body;

  const image = req.file

  if (
    !brand ||
    !model ||
    !price ||
    !year ||
    !category ||
    !seating_capacity ||
    !fuel_type ||
    !transmission ||
    !location ||
    !description ||
    !isAvailable
  ) {
    return res.status(400).json({
      message: "You missed credentials, Please fill all the credentials",
    });
  }

  // Check if image file was uploaded
  if (!req.file) {
    return res.status(400).json({
      message: "Car image is required",
    });
  }

  // 2. Convert strings from form-data into numbers
  price = Number(price);
  year = Number(year);
  seating_capacity = Number(seating_capacity);

  // 3. Validate that they are actually numbers (NaN means "Not a Number")
  if (isNaN(price)) {
    return res.status(400).json({ message: "price must be a valid number" });
  }
  if (isNaN(year)) {
    return res.status(400).json({ message: "Year must be a valid number" });
  }
  if (isNaN(seating_capacity)) {
    return res
      .status(400)
      .json({ message: "seating_capacity must be a valid number" });
  }

  // 4. Update req.body with the converted numbers so your database gets actual numbers
  req.body.price = price;
  req.body.year = year;
  req.body.seating_capacity = seating_capacity;

  next();
};
