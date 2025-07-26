const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description:
        "API for managing users, profiles, races, registrations, and event bookings with authentication",
    },
    servers: [
      {
        url: "http://localhost:4071",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            userName: {
              type: "string",
              example: "johndoe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
            role: {
              type: "string",
              enum: ["athlete", "coach", "admin"],
              example: "athlete",
            },
          },
        },
        Profile: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
            },
            profilePicture: {
              type: "string",
              example: "https://example.com/profile.jpg",
            },
            firstName: {
              type: "string",
              example: "John",
            },
            lastName: {
              type: "string",
              example: "Doe",
            },
            nationalId: {
              type: "string",
              example: "1234567890",
            },
            phoneNumber: {
              type: "string",
              example: "+1234567890",
            },
            dateOfBirth: {
              type: "string",
              format: "date",
              example: "1990-01-01",
            },
            tShirtSize: {
              type: "string",
              enum: ["XS", "S", "M", "L", "XL", "XXL"],
              example: "M",
            },
            gender: {
              type: "string",
              enum: ["male", "female", "other"],
              example: "male",
            },
            address: {
              type: "string",
              example: "123 Main St, City, Country",
            },
            emergencyContact: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Jane Doe",
                },
                phone: {
                  type: "string",
                  example: "+1987654321",
                },
                relationship: {
                  type: "string",
                  example: "Spouse",
                },
              },
            },
          },
        },
        Race: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Marathon 2024",
            },
            description: {
              type: "string",
              example: "Annual city marathon race",
            },
            Image: {
              type: "string",
              example: "https://example.com/race-image.jpg",
            },
            registrationPrice: {
              type: "string",
              example: "$50",
            },
            venue: {
              type: "string",
              example: "Central Park, NYC",
            },
            RegistrationStatus: {
              type: "string",
              enum: ["Open", "Closed", "Postponed"],
              example: "Open",
            },
            date: {
              type: "string",
              format: "date",
              example: "2024-06-15",
            },
            raceEvents: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  distanceRace: {
                    type: "string",
                    example: "5K",
                  },
                  reachLimit: {
                    type: "string",
                    example: "100 participants",
                  },
                },
              },
            },
          },
          required: [
            "name",
            "description",
            "registrationPrice",
            "venue",
            "date",
          ],
        },
        Registration: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              example: "John",
            },
            lastName: {
              type: "string",
              example: "Doe",
            },
            race: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
            },
            raceName: {
              type: "string",
              example: "Marathon 2024",
            },
            racePrice: {
              type: "number",
              example: 50,
            },
            raceEvent: {
              type: "string",
              example: "5K",
            },
            dateOfBirth: {
              type: "string",
              format: "date",
              example: "1990-01-01",
            },
            natonalID: {
              type: "string",
              example: "1234567890",
            },
            pollUrl: {
              type: "string",
              example: "https://example.com/poll/123",
            },
            paymentStatus: {
              type: "string",
              enum: ["paid", "pending", "failed", "unpaid"],
              example: "unpaid",
            },
            Gender: {
              type: "string",
              example: "male",
            },
            phoneNumber: {
              type: "string",
              example: "+1234567890",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            t_shirt_size: {
              type: "string",
              enum: ["XS", "S", "M", "L", "XL", "XXL"],
              example: "M",
            },
            registration_number: {
              type: "string",
              example: "MPR1234567890",
            },
          },
          required: [
            "firstName",
            "lastName",
            "race",
            "raceName",
            "racePrice",
            "raceEvent",
            "dateOfBirth",
            "Gender",
            "phoneNumber",
            "email",
            "t_shirt_size",
          ],
        },
        EventBooking: {
          type: "object",
          properties: {
            organizerName: {
              type: "string",
              example: "Jane Smith",
            },
            organizerEmail: {
              type: "string",
              example: "jane@example.com",
            },
            organizerPhone: {
              type: "string",
              example: "+1234567890",
            },
            eventName: {
              type: "string",
              example: "Annual Charity Run",
            },
            eventDate: {
              type: "string",
              format: "date",
              example: "2024-12-15",
            },
            venue: {
              type: "string",
              example: "City Park, Downtown",
            },
            expectedParticipants: {
              type: "number",
              example: 500,
            },
            supportRequested: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "Race Coordination",
                  "Logistics",
                  "Timekeeping",
                  "MC/Announcements",
                  "Marketing",
                  "Sponsorship",
                  "Volunteers",
                  "Medals & Prizes",
                  "Other",
                ],
              },
              example: ["Timekeeping", "Volunteers"],
            },
            additionalNotes: {
              type: "string",
              example: "We need help with securing sponsors",
            },
            bookingStatus: {
              type: "string",
              enum: ["Pending", "Accepted", "Rejected", "Cancelled"],
              example: "Pending",
            },
          },
          required: [
            "organizerName",
            "organizerEmail",
            "organizerPhone",
            "eventName",
            "eventDate",
            "venue",
            "expectedParticipants",
          ],
        },
        Order: {
          type: "object",
          properties: {
            customerName: {
              type: "string",
              example: "John Doe",
            },
            customerEmail: {
              type: "string",
              example: "john@example.com",
            },
            customerPhone: {
              type: "string",
              example: "+1234567890",
            },
            shippingAddress: {
              type: "string",
              example: "123 Main St, City, Country",
            },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    example: "507f1f77bcf86cd799439011",
                  },
                  name: {
                    type: "string",
                    example: "Running Shoes",
                  },
                  price: {
                    type: "number",
                    example: 99.99,
                  },
                  quantity: {
                    type: "number",
                    example: 2,
                  },
                  size: {
                    type: "string",
                    example: "M",
                  },
                  color: {
                    type: "string",
                    example: "Black",
                  },
                },
              },
            },
            totalAmount: {
              type: "number",
              example: 199.98,
            },
            paymentOption: {
              type: "string",
              enum: ["PayNow", "PayLater"],
              example: "PayNow",
            },
            paymentStatus: {
              type: "string",
              enum: ["Pending", "Paid", "Failed"],
              example: "Pending",
            },
            orderStatus: {
              type: "string",
              enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
              example: "Processing",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-05-15T10:00:00Z",
            },
          },
          required: [
            "customerName",
            "customerPhone",
            "shippingAddress",
            "products",
            "totalAmount",
            "paymentOption",
          ],
        },

        SportsNews: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "World Cup 2024 Announcement",
            },
            moreImages: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                "https://example.com/news1.jpg",
                "https://example.com/news2.jpg",
              ],
            },
            content: {
              type: "string",
              example:
                "The upcoming World Cup will feature 48 teams for the first time in history...",
            },
            category: {
              type: "string",
              enum: [
                "Football",
                "Cricket",
                "Basketball",
                "Rugby",
                "Tennis",
                "Athletics",
                "Boxing",
                "Formula 1",
                "Golf",
                "Other",
              ],
              example: "Football",
            },
            source: {
              type: "string",
              example: "Sports International",
            },
            imageUrl: {
              type: "string",
              example: "https://example.com/main-news-image.jpg",
            },
            publishedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T14:30:00Z",
            },
            author: {
              type: "string",
              example: "John SportsWriter",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T09:15:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T09:15:00Z",
            },
          },
          required: ["title", "content", "category", "source"],
        },
        Membership: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "Reference to User model",
              example: "507f1f77bcf86cd799439011",
            },
            profileId: {
              type: "string",
              description: "Reference to Profile model",
              example: "507f1f77bcf86cd799439012",
            },
            membershipType: {
              type: "string",
              enum: ["athlete", "coach", "official"],
              example: "athlete",
            },
            membershipStatus: {
              type: "string",
              enum: ["pending", "active", "rejected", "graduated"],
              example: "pending",
            },
            joinDate: {
              type: "string",
              format: "date-time",
              example: "2023-05-15T10:00:00Z",
            },
            approvedBy: {
              type: "string",
              description: "Reference to User model (admin/coach who approved)",
              example: "507f1f77bcf86cd799439013",
            },
            graduationDate: {
              type: "string",
              format: "date-time",
              example: "2024-05-15T10:00:00Z",
            },
            remarks: {
              type: "string",
              example: "Excellent performance in training",
            },
          },
          required: ["userId", "profileId", "membershipType"],
        },
        TrainingProgram: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Marathon Training Program",
            },
            description: {
              type: "string",
              example: "12-week program for marathon preparation",
            },
            assignedBy: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
              description: "Reference to User model (must be coach or admin)",
            },
            athletes: {
              type: "array",
              items: {
                type: "string",
                format: "objectId",
                example: "507f1f77bcf86cd799439012",
              },
              description: "Array of athlete user IDs",
            },
            startDate: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
            },
            endDate: {
              type: "string",
              format: "date-time",
              example: "2024-04-15T10:00:00Z",
            },
            status: {
              type: "string",
              enum: ["active", "completed", "cancelled"],
              example: "active",
            },
            notes: {
              type: "string",
              example: "Focus on endurance building in weeks 4-6",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T09:15:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T09:15:00Z",
            },
          },
          required: ["title", "assignedBy", "athletes"],
        },

        RaceExperience: {
          type: "object",
          properties: {
            author: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
              description: "ID of the user who created the experience",
            },
            membershipId: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439012",
              description: "ID of the related membership",
            },
            raceId: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439013",
              description: "ID of the related race",
            },
            title: {
              type: "string",
              example: "My First Marathon Experience",
              description: "Title of the experience",
            },
            experienceText: {
              type: "string",
              example:
                "It was an amazing experience running my first marathon...",
              description: "Detailed experience description",
            },
            images: {
              type: "array",
              items: {
                type: "string",
                example: "https://example.com/race-photo1.jpg",
              },
              description: "Array of image URLs",
            },
            likes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  userId: {
                    type: "string",
                    format: "objectId",
                    example: "507f1f77bcf86cd799439014",
                  },
                  likedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-01-15T10:00:00Z",
                  },
                },
              },
              description: "Array of user likes",
            },
            comments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  userId: {
                    type: "string",
                    format: "objectId",
                    example: "507f1f77bcf86cd799439015",
                  },
                  comment: {
                    type: "string",
                    example: "Great experience! I was there too!",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-01-16T08:30:00Z",
                  },
                },
              },
              description: "Array of user comments",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T09:15:00Z",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-10T09:15:00Z",
              description: "Last update timestamp",
            },
          },
          required: [
            "author",
            "membershipId",
            "raceId",
            "title",
            "experienceText",
          ],
        },

        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Error message",
            },
            error: {
              type: "string",
              example: "Detailed error description",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Running Shoes",
            },
            category: {
              type: "string",
              enum: [
                "Clothing",
                "Supplements",
                "Footwear",
                "Equipment",
                "Accessories",
                "Nutrition",
                "Other",
              ],
              example: "Footwear",
            },
            description: {
              type: "string",
              example: "High-performance running shoes for marathon",
            },
            images: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                "https://example.com/shoe1.jpg",
                "https://example.com/shoe2.jpg",
              ],
            },
            price: {
              type: "number",
              example: 89.99,
            },
            regularPrice: {
              type: "number",
              example: 99.99,
            },
            stockQuantity: {
              type: "number",
              example: 50,
            },
            brand: {
              type: "string",
              example: "RunFast",
            },
            sizeOptions: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["US 8", "US 9", "US 10"],
            },
            colorOptions: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["Black", "Blue", "Red"],
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["running", "lightweight", "cushioned"],
            },
            rating: {
              type: "number",
              example: 4.5,
            },
            isFeatured: {
              type: "boolean",
              example: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-05-15T10:00:00Z",
            },
          },
          required: ["name", "category", "price", "stockQuantity"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      {
        name: "Users",
        description: "Operations about users",
      },
      {
        name: "Profiles",
        description: "Operations about user profiles",
      },
      {
        name: "Races",
        description: "Operations about races",
      },
      {
        name: "Registrations",
        description: "Operations about race registrations",
      },
      {
        name: "Event Bookings",
        description: "Operations about event bookings",
      },
    ],
  },
  apis: [
    "./routers/user_router.js",
    "./routers/profile_router.js",
    "./routers/race_router.js",
    "./routers/registration_router.js",
    "./routers/event_booking_router.js",
    "./routers/product_router.js",
    "./routers/sports_news_router.js",
    "./routers/order_product_router.js",
    "./routers/membership_router.js",
    "./routers/training_program_router.js",
    "./routers/race_experience_router.js",
  ],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      swaggerOptions: {
        validatorUrl: null,
        persistAuthorization: true,
      },
    })
  );
};
