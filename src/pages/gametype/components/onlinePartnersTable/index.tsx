import React, { useEffect } from 'react'
import CustomCard from '../../../../components/common/card'
import CustomTable from '../../../../components/common/table'
import { onlinePartnersColumns } from '../../../../utils/tableColumns/onlinePartnersColumns'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../store'
import { createOnlinePartnerAction, deleteOnlinePartnerAction, fetchOnlinePartnersAction, updateOnlinePartnerAction, updateOnlinePartnersOrderAction } from '../../../../store/slices/onlinePartnersSlice/actions'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  clearPartners,
  setOnlinePartners,
  setSelectedOnlinePartner
} from '../../../../store/slices/onlinePartnersSlice'
import { IOnlinePartner } from '../../../../types/onlinePartners'
import { DndContext } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { AiOutlineMenu } from 'react-icons/ai'
import { message } from 'antd'
import { toggleModal } from '../../../../store/slices/modalSlices'

const OnlinePartnersTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { gameTypeId, onlinePartners, loading } = useSelector(
    (state: IRootStore) => state.onlinePartners
  )
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    return () => {
      dispatch(clearPartners())
    }
  }, [])

  const onDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = onlinePartners.findIndex(
        (i: IOnlinePartner) => i.order === active.id
      )
      const newIndex = onlinePartners.findIndex(
        (i: IOnlinePartner) => i.order === over.id
      )

      const newOrderedPartners = arrayMove(onlinePartners, oldIndex, newIndex).map(
        (item: IOnlinePartner, index: number) => ({
          ...item,
          order: index + 1
        })
      )

      // setLocalStores(newStores.sort((a, b) => a.order_number - b.order_number));
      dispatch(setOnlinePartners(newOrderedPartners))
      dispatch(updateOnlinePartnersOrderAction(newOrderedPartners, gameTypeId))
      console.log('newOrderedPartners', newOrderedPartners)
    }
  }

  const Row = ({ children, ...props }: any) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({
      id: props['data-row-key']
    })

    const style = {
      ...props.style,
      transform: CSS.Transform.toString(
        transform && { ...transform, scaleY: 1 }
      ),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 999 } : {})
    }

    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, child => {
          if ((child as React.ReactElement).key === 'sort') {
            return React.cloneElement(child as React.ReactElement, {
              children: (
                <AiOutlineMenu
                  //@ts-ignore
                  ref={setActivatorNodeRef}
                  style={{ touchAction: 'none', cursor: 'move' }}
                  {...listeners}
                />
              )
            })
          }
          return child
        })}
      </tr>
    )
  }

  const handleEditOnPartner = (partner: any) => {
    // dispatch(setSelectedOnlinePartner(partner))
    navigate(location.pathname + '/' + partner.id)
  }

  const handleDelOnPartner = (partner: any) => {
    dispatch(deleteOnlinePartnerAction(partner.id))
  }

  const handleOnPartnerStatus = (partner: any) => {
    dispatch(updateOnlinePartnerAction(partner.id, { status: !partner.status }))
  }

  const handleCopyHere = (partner: any) => {
    console.log(partner)
    dispatch(createOnlinePartnerAction({
      ...partner,
      highlights: partner.highlights.map((highlight: any) => highlight.id),
      id: undefined
    }))
  }

  const handleCopyAnywhere = (partner: any) => {
    dispatch(setSelectedOnlinePartner(partner))
    dispatch(toggleModal('edit'))
  }

  return (
    <CustomCard>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={onlinePartners.map((i: IOnlinePartner) => i.order)}
          strategy={verticalListSortingStrategy}
        >
          <CustomTable
            columns={onlinePartnersColumns(
              handleEditOnPartner,
              handleDelOnPartner,
              handleOnPartnerStatus,
              handleCopyHere,
              handleCopyAnywhere
            )}
            data={onlinePartners}
            loading={loading}
            rowKey={(record: any) => record.order}
            components={{
              body: {
                row: Row
              }
            }}
          />
        </SortableContext>
      </DndContext>
    </CustomCard>
  )
}

export default OnlinePartnersTable
