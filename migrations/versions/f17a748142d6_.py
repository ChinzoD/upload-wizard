"""empty message

Revision ID: f17a748142d6
Revises: fc73736b55fc
Create Date: 2018-03-16 16:01:48.432188

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f17a748142d6'
down_revision = 'fc73736b55fc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('history', sa.Column('file_size', sa.String(length=200), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('history', 'file_size')
    # ### end Alembic commands ###
