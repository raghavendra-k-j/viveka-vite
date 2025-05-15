import { useRef } from 'react';
import { STT } from '~/infra/utils/stt/STT';
import SimpleEditor from '~/ui/components/richeditor/TestEditor';


export default function HomePage() {
    const sttRef = useRef<STT>(new STT());

    return (
        <div className='max-w-[500px] m-5 mx-auto shaodow-lg'>
            <SimpleEditor />
        </div>
    );
}
