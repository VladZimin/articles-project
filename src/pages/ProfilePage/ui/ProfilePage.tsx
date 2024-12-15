import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import { EditableProfileCard } from 'features/EditableProfileCard/ui/EditableProfileCard';

interface ProfilePageProps {
    className?: string
}

const ProfilePage = memo(({ className }:ProfilePageProps) => {
    return (
        <Page className={classNames('', {}, [className])}>
            <EditableProfileCard />
        </Page>
    );
});

export default ProfilePage;
