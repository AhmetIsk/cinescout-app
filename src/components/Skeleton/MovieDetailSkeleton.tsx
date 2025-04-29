import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Skeleton
} from '@mui/material';

const MovieDetailSkeleton: React.FC = () => {
  return (
    <Card elevation={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ p: { xs: 2, md: 3 } }}>
        <Stack sx={{ width: { xs: '100%', md: '33.33%' } }}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: 400,
              borderRadius: 1,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
            }}
          />
        </Stack>

        <Stack sx={{ width: { xs: '100%', md: '66.67%' } }}>
          <CardContent sx={{ p: { xs: 1, md: 2 }, '&:last-child': { pb: 3 } }}>
            <Skeleton variant="text" height={60} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={30} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={100} sx={{ mb: 2 }} />
            <Stack spacing={1}>
              <Skeleton variant="text" height={25} />
              <Skeleton variant="text" height={25} />
              <Skeleton variant="text" height={25} />
            </Stack>
            <Skeleton variant="text" height={40} sx={{ mt: 2 }} width="40%" />
          </CardContent>
        </Stack>
      </Stack>
    </Card>
  );
};

export default MovieDetailSkeleton;