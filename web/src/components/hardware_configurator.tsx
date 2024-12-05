'use client'
import { useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'


// 
const categories = {
  locomotion: [
    { name: 'nanosaur', link: 'https://www.amazon.com/dp/B09Z3333333', price: '$40' },
    { name: 'yahboom', link: 'https://category.yahboom.net/collections/r-4-wheels-drive/products/4wdrobot', price: '$160' },
  ],
  manipulation: [
    { name: 'taubots', link: 'https://github.com/AlexanderKoch-Koch/low_cost_robot', price: '$200' },
    { name: 'Lewan Soul', link: 'https://www.amazon.com/dp/B0793PFGCY?ref=ppx_yo2ov_dt_b_fed_asin_title', price: '$141' },
  ],
  chip: [
    { name: 'Raspberry PI', link: 'https://www.amazon.com/dp/B09Z3333333', price: '$40' },
    { name: 'Jetson Orin', link: 'https://www.amazon.com/dp/B09Z3333333', price: '$240' },
  ],
}
export default function Example() {
  const [selected, setSelected] = useState({
    locomotion: categories.locomotion[0],
    manipulation: categories.manipulation[0],
    chip: categories.chip[0],
  })

  // Calculate total price from all selected options
  const totalPrice = Object.values(selected).reduce((sum, item) => {
    return sum + parseInt(item.price.replace('$', ''))
  }, 0)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(categories).map(([category, plans]) => (
          <fieldset key={category} aria-label={`${category} size`}>
            <div className="mb-4 text-lg font-bold capitalize">{category}</div>
            <RadioGroup 
              value={selected[category]} 
              onChange={(value) => setSelected(prev => ({ ...prev, [category]: value }))} 
              className="space-y-4"
            >
              {plans.map((plan) => (
                <Radio
                  key={plan.name}
                  value={plan}
                  aria-label={plan.name}
                  aria-description={`${plan.ram}, ${plan.cpus}, ${plan.disk}, ${plan.price} per month`}
                  className="group relative block cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-sm focus:outline-none data-[focus]:border-indigo-600 data-[focus]:ring-2 data-[focus]:ring-indigo-600 sm:flex sm:justify-between"
                >
                  <span className="flex items-center">
                    <span className="flex flex-col text-sm">
                      <span className="font-medium text-gray-900">{plan.name}</span>
                      <span className="text-gray-500">
                        <span className="block sm:inline">
                          {plan.ram} / {plan.cpus}
                        </span>{' '}
                        <span aria-hidden="true" className="hidden sm:mx-1 sm:inline">
                          &middot;
                        </span>{' '}
                        <span className="block sm:inline">{plan.disk}</span>
                      </span>
                    </span>
                  </span>
                  <span className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                    <span className="font-medium text-gray-900">{plan.price}</span>
                    <span className="ml-1 text-gray-500 sm:ml-0">/mo</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-600"
                  />
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        ))}
      </div>

      {/* Add price calculator display */}
      <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-700">Total Price: </span>
          <span className="text-2xl font-bold text-indigo-600">${totalPrice}/mo</span>
        </div>
      </div>
    </div>
  )
}
