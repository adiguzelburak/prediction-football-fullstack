/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const colors = [
  {score:0},
  {score:1},
  {score:2},
  {score:3},
  {score:4},
  {score:5},
  {score:6},
  {score:7},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Picker({onValueChange}) {
  const [selectedValue, setSelectedValue] = useState(colors[0])

  const handleChange = (newColor) => {
    setSelectedValue(newColor);
    onValueChange(newColor);
  };

  return (
    <RadioGroup value={selectedValue} onChange={handleChange}>
      <div className="mt-4 flex items-center space-x-3">
        {colors.map((color) => (
          <RadioGroup.Option
            key={color.score}
            value={color}
            className={({ active, checked }) =>
              classNames(
                'ring-green-500',
                active && checked ? 'ring ring-offset-1' : '',
                !active && checked ? 'ring-2' : '',
                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
              )
            }
          >
            <RadioGroup.Label as="p" className="sr-only">
              {color.score}
            </RadioGroup.Label>
            <span
              aria-hidden="true"
              className={classNames(
                inter.className,
              'bg-white text-gray-800 flex items-center justify-center h-7 w-7 border border-black border-opacity-10 rounded-full text-sm')}
            >{color.score}</span>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
