import styled from 'styled-components'
import Heading from '../../ui/Heading'
import Row from '../../ui/Row'
import useTodayActivity from './useTodayActivity'
import Spinner from '../../ui/Spinner'
import TodayItem from '../dashboard/TodayItem'

const StyledToday = styled.div`
    padding: 3.2rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    grid-column: 1 / span 2;
    grid-row: 2;
    padding-top: 2.4rem;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
`

const TodayList = styled.ul`
    overflow: scroll;
    overflow-x: hidden;

    /* Removing scrollbars for webkit, firefox, and ms, respectively */
    &::-webkit-scrollbar {
        width: 0 !important;
    }

    scrollbar-width: none;
    -ms-overflow-style: none;
`

const NoActivity = styled.p`
    text-align: center;
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 0.8rem;
`

function TodayActivity() {
    const { activities, isLoadingActivity } = useTodayActivity()

    return (
        <StyledToday>
            <Row type="horizontal">
                <Heading as="h2">Today</Heading>
            </Row>
            {!isLoadingActivity ? (
                activities!.length > 0 ? (
                    <TodayList>
                        {activities!.map((activity) => (
                            <TodayItem activity={activity} key={activity.id} />
                        ))}
                    </TodayList>
                ) : (
                    <NoActivity>No activity today...</NoActivity>
                )
            ) : (
                <Spinner />
            )}
        </StyledToday>
    )
}

export default TodayActivity
