import { useState } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarSvg from '../../assets/icons/star.svg';

interface StarRatingProps {
  className?: string
  size?: number
  onSelect?: (starsCount: number) => void;
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = ({
    className,
    selectedStars = 0,
    onSelect,
    size = 30,
}: StarRatingProps) => {
    const [selectedStarCount, setSelectedStarCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHoverStar = (starValue: number) => () => {
        if (!isSelected) {
            setSelectedStarCount(starValue);
        }
    };
    const onLeaveStar = () => {
        if (!isSelected) {
            setSelectedStarCount(0);
        }
    };
    const onClickStar = (starValue: number) => () => {
        if (!isSelected) {
            onSelect?.(starValue);
            setSelectedStarCount(starValue);
            setIsSelected(true);
        }
    };
    return (
        <div className={className}>
            {
                stars.map((starNumber) => (
                    <Icon
                        onMouseEnter={onHoverStar(starNumber)}
                        onMouseLeave={onLeaveStar}
                        onClick={onClickStar(starNumber)}
                        className={classNames(
                            cls.starIcon,
                            {
                                [cls.selected]: isSelected,
                            },
                            [selectedStarCount >= starNumber ? cls.hovered : cls.normal],
                        )}
                        key={starNumber}
                        Svg={StarSvg}
                        height={size}
                        width={size}
                    />
                ))
            }
        </div>
    );
};
