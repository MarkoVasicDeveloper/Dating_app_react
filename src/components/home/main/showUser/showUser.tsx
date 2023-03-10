import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../context/user.context';
import { Gallery } from './gallery/gallery';
import './showUser.scss';

interface ShowUserProps{
    path: string
    userToShow: any
    zIndex: number
    display: number
    end: boolean
}

export function ShowUser({ path, userToShow, zIndex, display, end}: ShowUserProps) {
    
    const hide = useRef(null) as any;
    const didMountRef = useRef(false);

    const [ user, setUser ] = useContext(UserContext) as any;

    const [ index, setIndex ] = useState(0);

    useEffect(() => {
        if(end && display === userToShow.length) return;
        if(zIndex === 1 && display === 0) return setIndex(display);
        if(zIndex === 1) return setIndex(display);

        const pause = setInterval(() => setIndex(display + 1), 500);

        return (() => clearInterval(pause))
        
    }, [display])

    useEffect(() => {
        if(end && display === userToShow.length) return;
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

    const about = user.role === 'lady' ? userToShow[index]?.gentlemanAbouts[0] : userToShow[index]?.ladyAbouts[0]
    
    const props = {
        zIndex,
        photos: user.role === 'lady' ? userToShow[index]?.photosGentlemen : userToShow[index]?.photosLadies,
        username: userToShow[index]?.username,
        city: userToShow[index]?.city,
        path,
        about: {
            educations: schoolStatus[about?.educations] || '',
            maritalStatus: maritalStatus[about?.maritalStatus] || '',
            profession: about?.profession || ''
        },
        years: String(new Date().getFullYear() - userToShow[index]?.dateOfBirth.slice(-4)) || ''
    }
    
    return (
        <div ref={hide} className="card-container show">
            <Gallery {...props} />
        </div>
    )
}