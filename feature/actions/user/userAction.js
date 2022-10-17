// export registerUser = () => {
    
// }



export async function getServerSideProps() {
    const response = await axios.post("https://essential-dating-api.herokuapp.com/api/users/register", input)
    return {
        props: {
            data: response.dasta
        },
    }
}