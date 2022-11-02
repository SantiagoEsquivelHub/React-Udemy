const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, uploadEvent, deleteEvent, createEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");
const router = Router();
router.use(jwtValidator);
/* Event Routes
host + api/events
 */

//Get events

router.get(
    "/",
    [//middlewares

    ],
    getEvents
);

//Create a new event

router.post(
    "/",
    [//middlewares
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    fieldValidator
    ],
    createEvent
);

//Upload event by id

router.put(
    "/:id",
    [//middlewares

    ],
    uploadEvent
);

//Delete event by id

router.delete(
    "/:id",
    [//middlewares

    ],
    deleteEvent
);

module.exports = router;
