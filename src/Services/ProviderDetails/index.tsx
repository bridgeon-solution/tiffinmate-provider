import api from "../api"

const PostProviderDetails = async (data: FormData) => {
    console.log('FormData before sending:', Array.from(data.entries()));
    const response = await api.post('/Provider/providerdetails', data);
    return response.data;
};



export default PostProviderDetails;