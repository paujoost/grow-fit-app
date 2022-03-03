import React from 'react'
import useStaticCmsData from '@/Hooks/useStaticCmsData';
import { getAllEntriesQuery } from '@/Queries/entry/getEntriesQuery';
import { useUser } from '@/Contexts/UserContext';
import EntryCard from '@/Components/PageComponents/Cards/EntryCard';
import Container from '@/Components/Wrappers/Container';
import IntroSection from '@/Components/PageSections/IntroSection';


export default function AllEntries() {
  const { currentUser } = useUser();
  const { data: entries } = useStaticCmsData({ entries: [] }, getAllEntriesQuery(currentUser.id));
  return (
    <Container>
      <IntroSection line={''} title={'Your enties'} />
      <div className="flex flex-wrap -mx-2 overflow-hidden grid-add-content pb-4">
        {entries?.entries?.map(item =>
          < EntryCard entry={item} key={item?.id} />

        )}
      </div>
    </Container>
  )
}