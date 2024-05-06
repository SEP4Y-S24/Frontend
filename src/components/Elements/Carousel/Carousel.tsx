import React, {PropsWithChildren, useCallback, useEffect, useState} from 'react'
import {EmblaCarouselType, EmblaOptionsType} from 'embla-carousel'

import useEmblaCarousel from 'embla-carousel-react'
import './CarouselStyle.css'
import RadioButton from "../../Form/RadioButton";
type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    data: Pokemon[]
    onSelect: (pokemonId: string) => void;
}
interface Pokemon {
    id: number;
    imageUrl: string;
}
type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}
const useDotButton = (
    emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

type PropTypes = PropsWithChildren<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
        >
    >

const DotButton: React.FC<PropTypes> = (props) => {
    const { children, ...restProps } = props

    return (
        <button type="button" {...restProps}>
            {children}
        </button>
    )
}





const EmblaCarousel: React.FC<PropType> = ({data, slides,options, onSelect}:PropType) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const handleOptionChange = (optionId: string) => {
        setSelectedOption(optionId);
        onSelect(optionId);
    };




    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {data.map((index) => (
                        <div className="embla__slide" key={index.id}>
                                <RadioButton  selectedOption={selectedOption} onChange={()=> handleOptionChange(index.id.toString())} id={index.id.toString()} imageUrl={index.imageUrl} altText={"Avatar " + index.id}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
