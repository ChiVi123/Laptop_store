'use client';

import { useState } from 'react';
import { EStatus } from '~/common/enums';
import { IEntityStatus } from '~/types/models';

export const useEntityStatus = (entity: IEntityStatus | undefined) => {
    return useState<boolean>(() => (entity ? entity.status === EStatus.ENABLED : true));
};
