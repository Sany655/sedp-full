import React from 'react'
import DefaultLayout from '@/app/components/layout/DefaultLayout'
import ProtectedRoute from '@/app/components/ProtectedRoute'
import OverviewClient from './OverviewClient'

function overview() {




    return (
        <DefaultLayout title='Campaign Overview'>
            <ProtectedRoute permissions={['view-policies']}>
                <OverviewClient />
            </ProtectedRoute>
        </DefaultLayout>
    )
}

export default overview