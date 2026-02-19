import { createBrowserRouter } from "react-router";
import LangdingPage from "../landingPage/LangdingPage";
import CreateInVoice from "../features/createInvoice/CreateInVoice";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LangdingPage />,
  },
  {
    path: "/create-invoice",
    element: <CreateInVoice />,
  },
]);



export default router;