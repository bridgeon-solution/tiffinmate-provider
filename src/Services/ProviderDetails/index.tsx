
import api from "../api"

const PostProviderDetails = async (data: FormData) => {
   
        const response = await api.post('/Provider/details', data);
        
        return response.data;

   
};




export default PostProviderDetails;