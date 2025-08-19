
// import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
// import { QueryBuilder } from "../../utils/QueryBuilder";
// import { tourSearchableFields, tourTypeSearchableFields } from "./tour.constant";
// import mongoose from "mongoose";

import { tourSearchableField } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createTour = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }

    // const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    // let slug = `${baseSlug}`

    // let counter = 0;
    // while (await Tour.exists({ slug })) {
    //     slug = `${slug}-${counter++}` // dhaka-division-2
    // }

    // payload.slug = slug;

    const tour = await Tour.create(payload)

    return tour;
};



// const getAllToursold = async (query: Record<string, string>) => {
//     console.log(query);
//     const filter = query
//     const searchTerm = query.searchTerm || "";
//     const sort = query.sort || "-createdAt";
//     const page = Number(query.page) || 1;
//     const limit = Number(query.limit) || 10;
//     const skip = (page - 1) * limit


//     const fields = query.fields?.split(",").join(" ") || ""; //old field: title,location, new: title location
//     // delete filter["searchTerm"]
//     // delete filter["sort"]


//     for (const field of excludeField) {  //for-of (Array), for-in(Object)
//         // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
//         delete filter[field]
//     }

// const searchQuery = {
//     $or: tourSearchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
// }
//     // const tours = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit);
//     const filterQuery = Tour.find(filter)
//     const tours = filterQuery.find(searchQuery)
//     const allTours = await tours.sort(sort).select(fields).skip(skip).limit(limit);


//     const totalTours = await Tour.countDocuments();
//     const totalPage = Math.ceil(totalTours / limit)

//     const meta = {
//         page: page,
//         limit: limit,
//         total: totalTours,
//         totalPage: totalPage
//     }

//     return {
//         data: allTours,
//         meta: meta
//     }
// };

const getAllTours = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(Tour.find(), query)

    const tours = await queryBuilder.search(tourSearchableField).filter().modelQuery
    // const allTours = await tours.sort(sort).select(fields).skip(skip).limit(limit);


    // const totalTours = await Tour.countDocuments();
    // const totalPage = Math.ceil(totalTours / limit)

    // const meta = {
    //     page: page,
    //     limit: limit,
    //     total: totalTours,
    //     totalPage: totalPage
    // }

    return {
        data: tours,
        // meta: meta
    }
};


const updateTour = async (id: string, payload: Partial<ITour>) => {

    const existingTour = await Tour.findById(id);

    if (!existingTour) {
        throw new Error("Tour not found.");
    }

    // if (payload.title) {
    //         const baseSlug = payload.title.toLocaleLowerCase().split(" ").join("-");
    //         let slug = `${baseSlug}`

    //         let counter = 0;
    //         while (await Tour.exists({ slug })) {
    //             slug = `${slug}-${counter++}`
    //         }

    //         payload.slug = slug;
    //     }
    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

    return updatedTour;
};
const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
};
const createTourType = async (payload: ITourType) => {
    const existingTourType = await TourType.findOne({ name: payload.name });

    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }

    return await TourType.create({ name: payload.name });
};

const getAllTourTypes = async () => {
    // const queryBuilder = new QueryBuilder(TourType.find(), query)

    // const tourTypes = await queryBuilder
    //     .search(tourTypeSearchableFields)
    //     .filter()
    //     .sort()
    //     .fields()
    //     .paginate()

    // const [data, meta] = await Promise.all([
    //     tourTypes.build(),
    //     queryBuilder.getMeta()
    // ])

    // return {
    //     data,
    //     meta
    // }
};
const getSingleTourType = async (id: string) => {
    const tourType = await TourType.findById(id);
    return {
        data: tourType
    };
};
const updateTourType = async (id: string, payload: ITourType) => {
    console.log(id);
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     throw new Error("Invalid ID format");
    // }

    const existingTourType = await TourType.findById(id);
    console.log(existingTourType);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
};
const deleteTourType = async (id: string) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    return await TourType.findByIdAndDelete(id);
};

export const TourService = {
    createTour,
    createTourType,
    deleteTourType,
    updateTourType,
    getAllTourTypes,
    getSingleTourType,
    getAllTours,
    updateTour,
    deleteTour,
};
