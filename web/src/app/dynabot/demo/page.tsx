
import LivekitViewer from "./LivekitViewer";
//llama-grid
//1. Zed 2i RTSP -
//2. roomba map + simulation as a practical tool
//3. seeing space as 3.js / music game
//4.  seeing space as 3.js / music game
//5.twitch plays pokemon

import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { Heading, Subheading } from "@/components/heading";
import { Select } from "@/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { getRecentOrders } from "@/data";

export function Stat({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith("+") ? "lime" : "pink"}>{change}</Badge>{" "}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  );
}

// export default async function Home() {
//   let orders = await getRecentOrders();

//   return (
//     <>
//       <Heading>Good afternoon, Erica</Heading>
//       <div className="mt-8 flex items-end justify-between">
//         <Subheading>Overview</Subheading>
//         <div>
//           <Select name="period">
//             <option value="last_week">Last week</option>
//             <option value="last_two">Last two weeks</option>
//             <option value="last_month">Last month</option>
//             <option value="last_quarter">Last quarter</option>
//           </Select>
//         </div>
//       </div>
//       <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
//         <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
//         <Stat title="Average order value" value="$455" change="-0.5%" />
//         <Stat title="Tickets sold" value="5,888" change="+4.5%" />
//         <Stat title="Pageviews" value="823,067" change="+21.2%" />
//       </div>
//       <Subheading className="mt-14">Recent orders</Subheading>
//       <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
//         <TableHead>
//           <TableRow>
//             <TableHeader>Order number</TableHeader>
//             <TableHeader>Purchase date</TableHeader>
//             <TableHeader>Customer</TableHeader>
//             <TableHeader>Event</TableHeader>
//             <TableHeader className="text-right">Amount</TableHeader>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {orders.map((order) => (
//             <TableRow
//               key={order.id}
//               href={order.url}
//               title={`Order #${order.id}`}
//             >
//               <TableCell>{order.id}</TableCell>
//               <TableCell className="text-zinc-500">{order.date}</TableCell>
//               <TableCell>{order.customer.name}</TableCell>
//               <TableCell>
//                 <div className="flex items-center gap-2">
//                   <Avatar src={order.event.thumbUrl} className="size-6" />
//                   <span>{order.event.name}</span>
//                 </div>
//               </TableCell>
//               <TableCell className="text-right">US{order.amount.usd}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </>
//   );
// }
//

const basics = [
  "livekit-2i-env-cameras",
  "jupyterlab",
  "seeing_space",
  "roombacat_map",
];

function Livekit_Viewer() {
  //segment anything Dec 11
  return (
    <LivekitViewer />
  );
}
function JupyterWikiGame() {
  return (
    <img
      alt=""
      src="https://tailwindui.com/plus/img/component-images/bento-02-performance.png"
      className="h-80 object-cover object-left"
    />
  );
}
function SeeingSpace() {
  return (
    <img
      alt=""
      src="https://tailwindui.com/plus/img/component-images/bento-02-performance.png"
      className="h-80 object-cover object-left"
    />
  );
}
function RoombaCat_Map() {
  return (
    <img
      alt=""
      src="https://tailwindui.com/plus/img/component-images/bento-02-performance.png"
      className="h-80 object-cover object-left"
    />
  );
}

const basic_functions = [];


export default function Example() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-400">
          Robotics Made Simple
        </h2>
        <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Dynabot.dev
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="flex p-px lg:col-span-4">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]">
              <Livekit_Viewer />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">
                  {basics[0]}
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  {basics[0]}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  {basics[0]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-px lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
              <SeeingSpace />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">
                  {basics[1]}
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  {basics[1]}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  {basics[2]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-px lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-bl-[2rem]">
              <JupyterWikiGame />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">
                  {basics[2]}
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  {basics[2]}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  {basics[2]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-px lg:col-span-4">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
              <RoombaCat_Map />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">
                  {basics[3]}
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  {basics[3]}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  {basics[3]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
