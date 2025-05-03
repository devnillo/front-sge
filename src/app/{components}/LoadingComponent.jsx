
import { LoaderCircle } from "lucide-react";

export function LoadingComponent() {
    return  <div className={ 'flex justify-center items-center h-screen w-screen overflow-hidden'}>
            <LoaderCircle size={70} className={'animate-spin'}/>
            </div>
}
