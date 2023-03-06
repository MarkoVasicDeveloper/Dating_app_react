import { useEffect, useRef, useState } from 'react';
import { Gallery } from './gallery/gallery';
import './showUser.scss';

interface ShowUserProps{
    path: string
    user: any
    zIndex: number
    display: number
    end: boolean
}

export function ShowUser({ path, user, zIndex, display, end}: ShowUserProps) {

    const hide = useRef(null) as any;
    const didMountRef = useRef(false);

    const [ index, setIndex ] = useState(0);

    useEffect(() => {
        if(end && display === user.length) return;
        if(zIndex === 1 && display === 0) return setIndex(display);
        if(zIndex === 1) return setIndex(display);

        const pause = setInterval(() => setIndex(display + 1), 500);

        return (() => clearInterval(pause))
        
    }, [display])

    useEffect(() => {
        if(end && display === user.length) return;
        if(zIndex === 1 && !didMountRef.current) {
            didMountRef.current = true;
            return
        };
        if(zIndex === 0 && !didMountRef.current) {
            hide?.current.classList.remove('show');
            didMountRef.current = true;
            return;
        }
            
        if(zIndex === 1) {
            hide?.current.classList.remove('hideItAnimation');
        }
        if(zIndex === 0) {
            hide?.current.classList.add('hideItAnimation');
            hide?.current.classList.remove('show');
        }
    }, [zIndex]);

    const maritalStatus = {
        'free': 'Slobodan/na',
        'married': 'U braku',
        'married,but': 'U braku, ali',
        'complicated': 'Komplikovano',
        'related': 'U vezi'
    } as any;

    const schoolStatus = {
        'primary school': 'Osnovna skola',
        'high school': 'Srednja skola',
        'college': 'Fakultet'
    } as any;

    const props = {
        zIndex,
        photosLadies: user[index]?.photosLadies,
        username: user[index]?.username,
        city: user[index]?.city,
        path,
        about: {
            educations: schoolStatus[user[index]?.ladyAbouts[0].educations] || '',
            maritalStatus: maritalStatus[user[index]?.ladyAbouts[0].maritalStatus] || '',
            profession: user[index]?.ladyAbouts[0].profession || ''
        },
        years: String(new Date().getFullYear() - user[index]?.dataOfBirth.slice(-4)) || ''
    }
    
    return (
        <div ref={hide} className="card-container show">
            <Gallery {...props} />
        </div>
    )
}