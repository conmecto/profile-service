import { interfaces, constants, enums, validationSchema, helpers } from '../utils';
import { CustomError, getProfiles, getProfileByUserId } from '../services';

const searchProfiles = async (req: interfaces.IRequestObject): Promise<interfaces.IGetMultipleProfiles[]> => {
    // update this to auth user header
    const userId = JSON.parse(req.headers['user'])?.userId;
    await validationSchema.searchProfilesSchema.validateAsync(req.query);
    const { q, city, page, perPage, country, sameCity } = req.query;
    const filterObj: interfaces.ISearchProfileFilterObj = {
      page: Number(page),
      perPage: Number(perPage),
      country
    }
    if (q) {
      filterObj.q = q;
    }
    if (city) {
      filterObj.city = city;
    } else if (sameCity) {
      const userProfile = await getProfileByUserId(userId); 
      if (!userProfile) {
        throw new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
      }
      filterObj.city = userProfile.city;
    }
    if (!filterObj.country) {
      filterObj.country = enums.Country.INDIA;
    }
    const profiles = await getProfiles(filterObj);
    return profiles;
}

export default searchProfiles;