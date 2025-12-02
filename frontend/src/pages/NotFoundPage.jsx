import Layout from "../components/Layout";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Layout>
            <div class="space-y-4">
                <p>404 | Not Found!</p>
                
                <Link className="mt-5 btn-link" to={'/'}>Back To Home</Link>
                
            </div>
        </Layout>
    )
}

export default NotFoundPage;