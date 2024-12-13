import api from "../api"

const PostProviderDetails = async (data: FormData) => {
   
    const response = await api.post('/Provider/providerdetails', data);
    return response.data;
};



export default PostProviderDetails;