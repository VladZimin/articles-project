import { memo, useCallback } from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import cls from './Code.module.scss';
import CopyIcon from '../../../assets/icons/copy-icon.svg';
import CopyIconNew from '../../../assets/icons/copy.svg';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Icon } from '../Icon';

interface CodeProps {
    className?: string
    text: string
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <pre
                    className={classNames(cls.CodeRedesigned, {}, [className])}
                >
                    <Icon
                        clickable
                        onClick={onCopy}
                        className={cls.copyBtn}
                        Svg={CopyIconNew}
                    />
                    <code>{text}</code>
                </pre>
            )}
            off={(
                <pre className={classNames(cls.Code, {}, [className])}>
                    <Button
                        onClick={onCopy}
                        className={cls.copyBtn}
                        theme={ButtonTheme.CLEAR}
                    >
                        <CopyIcon className={cls.copyIcon} />
                    </Button>
                    <code>{text}</code>
                </pre>
            )}
        />
    );
});
