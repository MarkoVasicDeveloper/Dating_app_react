import { faChevronLeft, faChevronRight, faHeartCircleBolt, faHouseFlag, faSchool, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect, useState } from "react";
import './gallery.scss';

interface GaleryProps {
    photosLadies: any[]
    username: string
    city?: string
    path: string
    zIndex: number
    about: {
        educations: string
        maritalStatus: string
        profession: string
    }
    years: string
}

export function Gallery({photosLadies, username, city, path, zIndex, about, years}: GaleryProps) {

    const galery = useRef(null) as any;
    const img = useRef(null) as any;
    const imgBar = useRef([]) as any;
    const [ currentImg, setCurrentImg ] = useState(null) as any

    useEffect(() => {
        galery.current.style.transform = `translate(${currentImg * galery.current.offsetWidth}px)`;
        if(img.current) img.current.style.width = galery.current.offsetWidth / photosLadies.length;
        setCurrentImg(0)
    }, [zIndex]);

    useEffect(() => {
        galery.current.style.transform = `translate(-${currentImg * galery.current.offsetWidth}px)`;
        if(currentImg < 0) return;
        imgBar.current.forEach((div: any) => {
            if(div) div.classList.remove('active');
        })
        imgBar.current[currentImg || 0].classList.add('active');
    }, [currentImg])
    
    function nextImg(value: number) {
        if(zIndex === 0) return;
        if(currentImg < 0 && value < 0) return setCurrentImg(0);
        if(currentImg === photosLadies.length - 1 && value > 0) return;
        if(value > 0) return setCurrentImg((prev: any) => prev + 1);
        setCurrentImg((prev: any) => prev - 1);
    }
    
    return (
        <>
            <div className="controls" style={{ zIndex: zIndex === 0 ? 0 : 2 }}>
                <span onClick={() => nextImg(-1)}><FontAwesomeIcon icon={faChevronLeft} /></span>
                <span onClick={() => nextImg(1)}><FontAwesomeIcon icon={faChevronRight} /></span>
            </div>
            <div className="img-bar">
                {
                    photosLadies?.map((photo, index) => (
                        <div ref={el => imgBar.current[index] = el} key={index} style={{ zIndex: zIndex === 0 ? 0 : 2 }}>{index + 1}</div>
                    ))
                }
            </div>
            <div className="galery" ref={galery}>
                {photosLadies?.map((photo, index) => (
                    <img ref={img} key={index} src={`${path}/${username}/${photo.path}`} alt={username} />
                ))}
            </div>
            <div className="user-info">
                <div className="identity">
                    <span>{username}</span>
                    <span>{years}</span>
                </div>
                <div className="livesIn">
                    <FontAwesomeIcon icon={faHouseFlag} />
                    <span>{city}</span>
                </div>
                <div className="other">
                    <div>
                        <FontAwesomeIcon icon={faSchool} />
                        <span>{about.educations}</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faHeartCircleBolt} />
                        <span>{about.maritalStatus}</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faUserAstronaut} />
                        <span>{about.profession}</span>
                    </div>
                </div>
            </div>
        </>
    )
}