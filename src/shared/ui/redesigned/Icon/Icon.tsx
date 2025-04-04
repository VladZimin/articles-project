import { FunctionComponent, memo, SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgType = Omit<SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgType {
  className?: string
  Svg: FunctionComponent<SVGProps<SVGSVGElement>>
}
interface NonClickableIconProps extends IconBaseProps {
  clickable?: false
}
interface ClickableIconProps extends IconBaseProps {
  clickable: true
  onClick: () => void
}
type IconProps = ClickableIconProps | NonClickableIconProps;

export const Icon = memo((props: IconProps) => {
    const {
        className, Svg, clickable, width = 32, height = 32, ...restProps
    } = props;

    const icon = (
        <Svg
            width={width}
            height={height}
            className={classNames(cls.Icon, {}, [className])}
            {...restProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button type="button" onClick={props.onClick} style={{ width, height }}>
                {icon}
            </button>
        );
    }
    return icon;
});
