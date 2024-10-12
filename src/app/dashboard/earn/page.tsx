'use client'

import { getTotalTasksByAllPlatforms } from '@/services/advertService'
import { cn, toIntlCurrency } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socialMenu } from '../../../components/data/SocialData'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { selectIsError, setTotalTasks } from '../../../redux/slices/advertSlice'
import { selectUser } from '../../../redux/slices/authSlice'
import { selectTasks } from '../../../redux/slices/taskSlice'
import Loading from '../loading'

// Define the shape of a task
interface Task {
  id: string
  platform: string
  taskPerformerId: string
  status: string
}

// Define the shape of platform tasks
interface PlatformTasks {
  [key: string]: { totalTasks: number }
}

const Earn: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isError: boolean = useSelector(selectIsError)
  const user = useSelector(selectUser)
  const tasks: Task[] = useSelector(selectTasks) // Get all tasks
  const [platformTasks, setPlatformTasks] = useState<PlatformTasks>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Redirect if user is not logged in
  useRedirectLoggedOutUser('/login')

  useEffect(() => {
    async function getTasks() {
      try {
        setIsLoading(true)
        const res: PlatformTasks = await getTotalTasksByAllPlatforms()

        // Filter tasks to exclude those already performed by the user
        const updatedPlatformTasks: PlatformTasks = {}
        Object.keys(res).forEach((platform) => {
          const totalTasks = res[platform].totalTasks

          // Count only tasks the user hasn't performed or submitted
          const remainingTasks = tasks.filter(
            (task) =>
              task.platform === platform &&
              task.taskPerformerId !== user._id &&
              task.status !== 'Submitted'
          ).length

          updatedPlatformTasks[platform] = {
            totalTasks: Math.min(remainingTasks, totalTasks),
          }
        })

        setPlatformTasks(updatedPlatformTasks)

        // Calculate total tasks across all platforms and dispatch to Redux
        const totalTasksAcrossAllPlatforms = Object.values(updatedPlatformTasks).reduce(
          (acc, platform) => acc + platform.totalTasks,
          0
        )
        dispatch(setTotalTasks(totalTasksAcrossAllPlatforms))

        setIsLoading(false)
      } catch (error) {
        console.error('Failed to retrieve tasks', error)
        setIsLoading(false)
      }
    }

    getTasks()
  }, [dispatch, tasks, user._id])

  return (
    <Suspense>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-fit">
          <div className="justify-between mx-auto md:mr-5">
            <div className="flex items-center gap-3 border-b border-gray-200 py-5">
              <MdOutlineKeyboardArrowLeft
                className="cursor-pointer"
                size={30}
                onClick={() => router.back()}
              />
              <div className="flex flex-col">
                <p className="font-semibold text-xl text-gray-700">
                  Perform Social Tasks and Earn
                </p>
                <small className="font-medium text-gray-500">
                  When you click on a platform, you will see only the tasks you are qualified to perform.
                </small>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center justify-center mt-[1rem] px-3 py-5">
              {socialMenu.map((menu, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(`/dashboard/taskearn/${menu.value}`)
                  }}
                  className="w-fit hover:shadow cursor-pointer md:w-full border rounded-lg p-5"
                >
                  <div className="flex flex-row items-center gap-5">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-center w-[100px] h-[100px] bg-gray-50 rounded-t-xl rounded-b-2xl">
                        <Image
                          src={menu.icon}
                          alt={menu.title}
                          className="object-cover h-16 w-16 rounded-full p-2"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-ro md:justify-between md:items-center md:border-gray-100">
                      <div className="flex flex-col w-full">
                        <h3 className="font-bold text-[20px]">{menu.title}</h3>
                        <p className="pb-3 text-[14px] text-gray-500 font-semibold">
                          <span className="font-extrabold">Earning: </span>
                          {toIntlCurrency(menu.earn.toString())} / Task
                        </p>
                      </div>
                      <div className="w-full">
                        <small
                          className={`py-2 px-5 ${
                            !platformTasks[menu.value]?.totalTasks
                              ? 'bg-gray-500'
                              : 'bg-secondary'
                          } text-primary rounded-2xl`}
                        >
                          <span className={cn('mr-1')}>
                            {platformTasks[menu.value]?.totalTasks || 0}
                          </span>
                          Tasks Available
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-2">
                    <p className="font-normal text-[14px] text-gray-700 mt-3">
                      {menu.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Suspense>
  )
}

export default Earn
