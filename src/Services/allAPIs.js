import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverURL"


//register api
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

//login API
export const loginAPI = async(user,userType)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,{...user,userType},"")
}
//add recipe Api
export const addRecipeAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/newrecipes`,reqBody,reqHeader)
}
//get all recipes
export const getAllRecipesAPI = async(searchKey)=>{
    return await commonAPI("GET",`${SERVER_URL}/recipes?search=${searchKey}`,"","")
}
//get user recipes
export const getUserRecipeAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/personalrecipes`,"",reqHeader)
}
//get category based recipes
export const getcategoryRecipesAPI = async(category)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-category-recipes?category=${category}`,"","")
}
//get a single recipe
export const getSingleRecipeAPI =  async(id)=>{
    return await commonAPI("GET",`${SERVER_URL}/view/${id}`,"","")
}

//user profile updation
export const updateUserProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/profile`,reqBody,reqHeader)
}

//add to fav
export const addToSaveAPI=  async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/favorite`,reqBody,reqHeader)
}
//get save list
export const getSaveRecipeAPI= async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/favorite`,"",reqHeader)
}
//delete save recipe
export const deleteSaveRecipeAPI= async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/favorite/${id}`,{},reqHeader)
}

//edit recipe
export const editRecipeAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/personalrecipes/edit/${id}`,reqBody,reqHeader)

}

//delete recipe
export const deleteRecipeAPI= async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/personalrecipes/delete/${id}`,{},reqHeader)
}
