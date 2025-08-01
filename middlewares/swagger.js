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
        CoachingCourse: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Advanced Running Techniques",
              description: "Title of the coaching course",
            },
            description: {
              type: "string",
              example:
                "Learn advanced running techniques from professional coaches",
              description: "Detailed description of the course",
            },
            coach: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
              description: "Reference to the coach User",
            },
            coverImage: {
              type: "string",
              example: "https://example.com/course-cover.jpg",
              description: "URL to the course cover image",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2024-06-15T10:00:00Z",
              description: "Date and time of the course",
            },
            durationInHours: {
              type: "number",
              example: 2,
              description: "Duration of the course in hours",
            },
            capacity: {
              type: "number",
              example: 20,
              description: "Maximum number of attendees",
            },
            location: {
              type: "string",
              example: "Online",
              description: "Physical location or 'Online'",
            },
            platformLink: {
              type: "string",
              example: "https://zoom.us/j/123456789",
              description: "Online meeting link (if applicable)",
            },
            price: {
              type: "number",
              example: 99.99,
              description: "Current price of the course",
            },
            regularPrice: {
              type: "number",
              example: 129.99,
              description: "Regular price before discount",
            },
            difficultyLevel: {
              type: "string",
              enum: ["Beginner", "Intermediate", "Advanced"],
              example: "Intermediate",
              description: "Difficulty level of the course",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Last update timestamp",
            },
          },
          required: [
            "title",
            "description",
            "coach",
            "date",
            "durationInHours",
            "capacity",
            "location",
            "price",
          ],
        },

        DailyTraining: {
          type: "object",
          properties: {
            dayNumber: {
              type: "number",
              example: 1,
              description: "Day number in the training program",
            },
            date: {
              type: "string",
              format: "date",
              example: "2024-06-01",
              description: "Date of the training day",
            },
            title: {
              type: "string",
              example: "Base Building - Easy Run",
              description: "Title of the day's training",
            },
            description: {
              type: "string",
              example: "30 minute easy run to build aerobic base",
              description: "Description of the day's workout",
            },
            workoutPlan: {
              type: "string",
              example: "Run 30 minutes at conversational pace",
              description: "Detailed workout plan",
            },
            durationInMinutes: {
              type: "number",
              example: 30,
              description: "Duration of workout in minutes",
            },
            intensityLevel: {
              type: "string",
              enum: ["Low", "Moderate", "High", "Very High"],
              example: "Moderate",
              description: "Intensity level of the workout",
            },
            images: {
              type: "array",
              items: {
                type: "string",
                example: "https://example.com/workout1.jpg",
              },
              description: "Array of image URLs for the workout",
            },
            notes: {
              type: "string",
              example: "Focus on maintaining good form",
              description: "Additional notes for the workout",
            },
            isRestDay: {
              type: "boolean",
              example: false,
              description: "Whether this is a rest day",
            },
          },
          required: [
            "dayNumber",
            "date",
            "title",
            "description",
            "workoutPlan",
            "durationInMinutes",
            "intensityLevel",
          ],
        },

        TrainingProgramPackage: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Advanced Marathon Training Program",
              description: "Title of the training program package",
            },
            description: {
              type: "string",
              example:
                "16-week intensive marathon training program for advanced runners",
              description: "Detailed description of the package",
            },
            coverImage: {
              type: "string",
              example: "https://example.com/marathon-program.jpg",
              description: "URL to the program cover image",
            },
            durationInWeeks: {
              type: "number",
              example: 16,
              description: "Duration of the program in weeks",
            },
            dailyTrainings: {
              type: "array",
              items: {
                $ref: "#/components/schemas/DailyTraining",
              },
              description: "Array of daily training programs",
            },
            targetRaceType: {
              type: "string",
              example: "Marathon",
              description: "Type of race this program targets",
            },
            startDate: {
              type: "string",
              format: "date",
              example: "2024-06-01",
              description: "Program start date",
            },
            endDate: {
              type: "string",
              format: "date",
              example: "2024-09-15",
              description: "Program end date",
            },
            price: {
              type: "number",
              example: 299.99,
              description: "Current price of the package",
            },
            regularPrice: {
              type: "number",
              example: 399.99,
              description: "Regular price before discount",
            },
            difficultyLevel: {
              type: "string",
              enum: ["Beginner", "Intermediate", "Advanced", "Elite"],
              example: "Advanced",
              description: "Difficulty level of the program",
            },
            coachBiography: {
              type: "string",
              example:
                "Certified running coach with 10 years of experience training marathoners",
              description: "Biography of the coach",
            },
            coach: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
              description: "Reference to the coach User",
            },
            galleryImages: {
              type: "array",
              items: {
                type: "string",
                example: "https://example.com/program-gallery1.jpg",
              },
              description: "Additional images for the program",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Last update timestamp",
            },
          },
          required: [
            "title",
            "description",
            "durationInWeeks",
            "targetRaceType",
            "startDate",
            "endDate",
            "price",
            "regularPrice",
            "difficultyLevel",
            "coachBiography",
            "coach",
          ],
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

        TrainingPackageBought: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
              description: "Reference to the User who bought the package",
            },
            training_program_package_id: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439012",
              description: "Reference to the TrainingProgramPackage",
            },
            paymentStatus: {
              type: "string",
              enum: ["pending", "completed", "failed"],
              example: "completed",
              description: "Payment status of the purchase",
            },
            pollUrl: {
              type: "string",
              example: "https://example.com/poll/123",
            },
            pricePaid: {
              type: "number",
              example: 299.99,
              description: "Amount paid for the package",
            },
            boughtAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Timestamp of purchase",
            },
          },
          required: [
            "userId",
            "training_program_package_id",
            "paymentStatus",
            "pricePaid",
          ],
        },
        Exercise: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Foam Rolling",
              description: "Name of the exercise",
            },
            videoUrl: {
              type: "string",
              example: "https://example.com/foam-rolling.mp4",
              description: "URL to exercise demonstration video",
            },
            images: {
              type: "array",
              items: {
                type: "string",
                example: "https://example.com/exercise1.jpg",
              },
              description: "Array of exercise image URLs",
            },
            description: {
              type: "string",
              example: "Foam rolling for calf muscles",
              description: "Description of how to perform the exercise",
            },
            repetitions: {
              type: "string",
              example: "3 sets of 30 seconds",
              description: "Recommended repetitions/sets",
            },
          },
          required: ["name"],
        },

        Nutrient: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Omega-3 Fatty Acids",
              description: "Name of the nutrient",
            },
            benefit: {
              type: "string",
              example: "Reduces inflammation in joints",
              description: "Benefit of the nutrient for injury recovery",
            },
            recommendedFoods: {
              type: "array",
              items: {
                type: "string",
                example: "Salmon",
              },
              description: "Foods rich in this nutrient",
            },
          },
          required: ["name"],
        },

        InjuryExerciseSolution: {
          type: "object",
          properties: {
            injuryType: {
              type: "string",
              example: "Runner's Knee",
              description: "Type of injury being addressed",
            },
            description: {
              type: "string",
              example:
                "Solutions for patellofemoral pain syndrome common in runners",
              description: "Description of the injury and solution approach",
            },
            exercises: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Exercise",
              },
              description: "Recommended exercises for recovery",
            },
            nutrients: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Nutrient",
              },
              description: "Recommended nutrients for recovery",
            },
            difficultyLevel: {
              type: "string",
              enum: ["Beginner", "Intermediate", "Advanced"],
              example: "Intermediate",
              description: "Difficulty level of the exercises",
            },
            price: {
              type: "number",
              example: 49.99,
              description: "Current price of the solution package",
            },
            regularPrice: {
              type: "number",
              example: 59.99,
              description: "Regular price before discount",
            },
            coverImage: {
              type: "string",
              example: "https://example.com/runners-knee-solution.jpg",
              description: "Cover image for the solution package",
            },
            coach: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
              description: "Reference to the coach who created this solution",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Last update timestamp",
            },
          },
          required: ["injuryType", "description", "price"],
        },
        InjurySolutionPurchase: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
              description: "Reference to the User who purchased the solution",
            },
            injury_solution_id: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439012",
              description: "Reference to the InjuryExerciseSolution",
            },
            paymentStatus: {
              type: "string",
              enum: ["pending", "completed", "failed"],
              example: "completed",
              description: "Payment status of the purchase",
            },
            pollUrl: {
              type: "string",
              example: "https://paymentprovider.com/poll/123",
              description: "Payment poll URL for tracking payment status",
            },
            pricePaid: {
              type: "number",
              example: 49.99,
              description: "Amount paid for the solution",
            },
            purchasedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Timestamp of purchase",
            },
          },
          required: [
            "userId",
            "injury_solution_id",
            "paymentStatus",
            "pricePaid",
          ],
        },
        CourseBooking: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439011",
              description: "Reference to the User who booked the course",
            },
            courseId: {
              type: "string",
              format: "objectId",
              example: "507f1f77bcf86cd799439012",
              description: "Reference to the CoachingCourse",
            },
            paymentStatus: {
              type: "string",
              enum: ["pending", "completed", "failed"],
              example: "completed",
              description: "Payment status of the booking",
            },
            pollUrl: {
              type: "string",
              example: "https://paymentprovider.com/poll/123",
              description: "Payment poll URL for tracking payment status",
            },
            pricePaid: {
              type: "number",
              example: 99.99,
              description: "Amount paid for the course",
            },
            bookedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:00:00Z",
              description: "Timestamp of booking",
            },
            attendanceStatus: {
              type: "string",
              enum: ["not attended", "attended", "cancelled"],
              example: "not attended",
              description: "Attendance status of the participant",
            },
          },
          required: ["userId", "courseId", "paymentStatus", "pricePaid"],
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
      {
        name: "Products",
        description: "Operations about products",
      },
      {
        name: "Sports News",
        description: "Operations about sports news",
      },
      {
        name: "Orders",
        description: "Operations about product orders",
      },
      {
        name: "Memberships",
        description: "Operations about memberships",
      },
      {
        name: "Training Programs",
        description: "Operations about training programs",
      },
      {
        name: "Training Packages Bought",
        description: "Operations about purchased training packages",
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
    "./routers/training_program_package_router.js",
    "./routers/training_package_bought_router.js",
    "./routers/injury_exercise_solution_router.js",
    "./routers/injury_solution_purchase_router.js",
    "./routers/coaching_course_router.js",
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
