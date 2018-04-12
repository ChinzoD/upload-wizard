"""empty message

Revision ID: a352d44be54b
Revises: 91ff7ff27f7d
Create Date: 2018-04-10 09:43:01.220153

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a352d44be54b'
down_revision = '91ff7ff27f7d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('short_name', sa.String(length=64), nullable=True))
    op.create_index(op.f('ix_user_short_name'), 'user', ['short_name'], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_short_name'), table_name='user')
    op.drop_column('user', 'short_name')
    # ### end Alembic commands ###