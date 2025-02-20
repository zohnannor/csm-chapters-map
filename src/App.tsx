import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Arcs } from './components/Arcs';
import { CalendarModal, CalendarModalButton } from './components/CalendarModal';
import { ChapterWidthButton } from './components/ChapterWidthButton';
import { FloatingButtons } from './components/FloatingButtons';
import { InfoBox, InfoBoxButton } from './components/InfoBox';
import { Scroller } from './components/Scroller';
import { Seasons } from './components/Seasons';
import { Timeline } from './components/Timeline';
import { TimeLineHeaders } from './components/TimeLineHeaders';
import { ToggleTitlesButton } from './components/ToggleTitlesButton';
import { Volumes } from './components/Volumes';
import useWindowSize from './hooks/useWindowSize';
import { useSettings } from './providers/SettingsProvider';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
`;

const App: React.FC = () => {
    const { width } = useWindowSize();
    const { infoBoxOpen, calendarOpen } = useSettings();

    const handleScroll = useCallback(
        (e: WheelEvent) => {
            if (infoBoxOpen || calendarOpen) return;
            document.body.scrollLeft += e.deltaY;
        },
        [infoBoxOpen, calendarOpen]
    );

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, [handleScroll]);

    return (
        <>
            <TimeLineHeaders />
            <CalendarModal />
            <InfoBox />
            <AppContainer className='appContainer'>
                <FloatingButtons>
                    <InfoBoxButton />
                    <ChapterWidthButton />
                    <CalendarModalButton />
                    <ToggleTitlesButton />
                </FloatingButtons>
                <Seasons />
                <Arcs />
                <Timeline />
                <Volumes />
                {width > 768 && <Scroller />}
            </AppContainer>
        </>
    );
};

export default App;
