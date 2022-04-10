import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { notesService } from '../../services/notesService';
import ReportChart from './ReportChart';

const WeeklyReport = () => {
    const { userId } = useParams();

    const [emotions, setEmotions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        notesService.getAll(userId, null, false, 'asc')
            .then(response => {
                setEmotions(response);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [userId]);

    return (
        <>  
            {isLoading && <p>Loading...</p>}
            {!isLoading && 
                <section className="flex flex-col items-center pb-10">
                    <h1 className="title mb-20">Weekly report</h1>

                    <ReportChart emotions={emotions}></ReportChart>
                </section>
            }   
        
        </>
    )

}

export default WeeklyReport;