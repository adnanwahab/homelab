import TableOfContents from '@/components/Table-Of-Contents'
import ModeSelector from '../ModeSelector'
import SupportDynamicland from '../micro-dynamicland/SupportDynamicland'



export default function Comic() {
  return <>
    <TableOfContents />
    <div>Comic</div>
    <ModeSelector />
    <SupportDynamicland />
    </>
}
