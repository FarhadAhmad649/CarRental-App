import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import main_car from "./main_car.png"
import banner_car_image from "./banner_car_image.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import car_image1 from "./car_image1.png"
import car_image2 from "./car_image2.png"
import car_image3 from "./car_image3.png"
import car_image4 from "./car_image4.png"
import boy from './boy.png'
import car6 from './car6.jpg'
import car7 from './car7.jpg'
import car8 from './car8.jpg'
import car9 from './car9.jpg'
import car10 from './car10.jpg'
import car11 from './car11.jpg'
import car12 from './car12.jpg'
import car13 from './car13.jpg'
import car14 from './car14.jpg'
import car15 from './car15.jpg'
import car16 from './car16.jpg'
import car17 from './car17.jpg'
import car18 from './car18.jpg'
import car19 from './car19.jpg'
import car20 from './car20.jpg'
import car21 from './car21.jpg'
import car22 from './car22.jpg'

export const cityList = ['New York', 'Los Angeles', 'Houston', 'Chicago']

export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    boy,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    main_car,
    banner_car_image,
    car_image1,
    upload_icon,
    user_profile,
    car_image2,
    car_image3,
    car_image4,
    car6,
    car7,
    car8,
    car9,
    car10,
    car11,
    car12,
    car13,
    car14,
    car15,
    car16,
    car17,
    car18,
    car19,
    car20,
    car21,
    car22
}


export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add car", path: "/owner/add-car", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Cars", path: "/owner/manage-cars", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "GreatStack",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}


export const dummyCarData = [
  {
    _id: "67fdff5bc069c03d4e45f30b77",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "BMW",
    model: "X5",
    image: car_image1,
    year: 2006,
    category: "SUV",
    seating_capacity: 4,
    fuel_type: "Hybrid",
    transmission: "Semi-Automatic",
    price: 300,
    location: "New York",
    description:
      "The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.",
    isAvaliable: true,
    createdAt: "2025-04-16T07:26:56.215Z",
  },
  {
    _id: "67ff6b758f1b368df4286a2a65",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Toyota",
    model: "Corolla",
    image: car_image2,
    year: 2021,
    category: "Sedan",
    seating_capacity: 4,
    fuel_type: "Diesel",
    transmission: "Manual",
    price: 130,
    location: "Chicago",
    description:
      "The Toyota Corolla is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-16T08:33:57.993Z",
  },
  {
    _id: "67ff6b9f8f1b3df684286a2a68",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Jeep ",
    model: "Wrangler",
    image: car_image3,
    year: 2023,
    category: "SUV",
    seating_capacity: 4,
    fuel_type: "Hybrid",
    transmission: "Automatic",
    price: 200,
    location: "Los Angeles",
    description:
      "The Jeep Wrangler is a mid-size luxury SUV produced by Jeep. The Wrangler made its debut in 2003 as the first SUV ever produced by Jeep.",
    isAvaliable: true,
    createdAt: "2025-04-16T08:34:39.592Z",
  },
  {
    _id: "68009c93a6df3f5fc6338ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car_image4,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68009c93df5a3f5fc6338ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car6,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68009c493a3f5fc6338dfea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car7,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68009c935a3f5fc6338ea7edf34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car8,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68009c943a3f5fc6338ea7e3df4",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car9,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "680209c93a3f5fc633df8ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car10,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "638009c93a3f5fc633fd8ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car11,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "680029c93a3f5fc6338efda7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car12,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68079c93a3f5fc6338fdea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car13,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "680c93a3f5fc633df8ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car14,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "6009c93fda3f5fc6338ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car15,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "8009c9fd3a3f5fc6338ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car16,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68009cfda3f5fc6338ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car17,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68fd09c9a3f5fc6338ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car18,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "6fd8009c93a35fc633ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car19,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68fd009c93a3f5fc633ea734",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car20,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68fd009c93a3f5f6338e7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car21,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "680df09c933f5fc6338a7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car22,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    price: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
];

export const dummyMyBookingsData = [
    {
        "_id": "68482bcc98eb9722b7751f70",
        "car": dummyCarData[0],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-13T00:00:00.000Z",
        "returnDate": "2025-06-14T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T12:57:48.244Z",
    },
    {
        "_id": "68482bb598eb9722b7751f60",
        "car": dummyCarData[1],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-12T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 130,
        "createdAt": "2025-06-10T12:57:25.613Z",
    },
    {
        "_id": "684800fa0fb481c5cfd92e56",
        "car": dummyCarData[2],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 600,
        "createdAt": "2025-06-10T09:55:06.379Z",
    },
    {
        "_id": "6847fe790fb481c5cfd92d94",
        "car": dummyCarData[3],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T09:44:25.410Z",
    }
]

export const dummyDashboardData = {
    "totalCars": 4,
    "totalBookings": 2,
    "pendingBookings": 0,
    "completedBookings": 2,
    "recentBookings": [
        dummyMyBookingsData[0],
        dummyMyBookingsData[1]
    ],
    "monthlyRevenue": 840
}

export const dummyReviewsData = [
    {
        "image":"",
        "name":"Emma Rodriguez",
        "location":"New York, USA",
        "stars":"5",
        "comment":"I've rented cars from various companies, but the experience with CarRental was exceptional."
    },
    {
        "image":"",
        "name":"Andrie Rodriguez",
        "location":"Jandual, USA",
        "stars":"5",
        "comment":"I've rented cars from various companies, but the experience with CarRental was exceptional."
    },{
        "image":"",
        "name":"Latina Sriguez",
        "location":"New Jersey, Juraselam",
        "stars":"5",
        "comment":"I've rented cars from various companies, but the experience with CarRental was exceptional."
    }
    ]